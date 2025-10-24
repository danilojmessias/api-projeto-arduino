import { Controller, Get, Post, Put, Body, Path, Route, Tags, SuccessResponse, Query } from 'tsoa';
import { CreateTestRequest, TestResponse, StartStopTestResponse, CreateMultipleTestsRequest, CreateMultipleTestsResponse } from '../models/Test';
import { TestModel, ITest } from '../models/TestModel';
import { SceneModel } from '../models/SceneModel';

@Route('tests')
@Tags('Tests')
export class TestController extends Controller {

    /**
     * Get all tests for a specific scene
     * @param sceneId The scene ID to get tests for
     */
    @Get()
    @SuccessResponse('200', 'Retrieved tests successfully')
    public async getTestsByScene(@Query() sceneId: string): Promise<TestResponse[]> {
        try {
            if (!sceneId) {
                throw new Error('Scene ID is required');
            }

            // Validate ObjectId format
            if (!sceneId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid scene ID format');
            }

            // Check if scene exists
            const sceneExists = await SceneModel.findById(sceneId);
            if (!sceneExists) {
                throw new Error('Scene not found');
            }

            // Find tests by scene ID
            const tests = await TestModel.find({ sceneId }).sort({ createdAt: -1 });

            return tests.map(test => ({
                id: (test as any)._id.toString(),
                name: test.name,
                sceneId: test.sceneId,
                state: test.state,
                createdAt: test.createdAt
            }));
        } catch (error: any) {
            console.error('Error fetching tests:', error);
            throw new Error(error.message || 'Failed to fetch tests');
        }
    }

    /**
     * Create a new test
     */
    @Post()
    @SuccessResponse('201', 'Test created successfully')
    public async createTest(@Body() requestBody: CreateTestRequest): Promise<TestResponse> {
        try {
            // Validate ObjectId format for sceneId
            if (!requestBody.sceneId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid scene ID format');
            }

            // Check if scene exists
            const sceneExists = await SceneModel.findById(requestBody.sceneId);
            if (!sceneExists) {
                throw new Error('Scene not found');
            }

            const newTest = new TestModel({
                name: requestBody.name,
                sceneId: requestBody.sceneId,
                state: requestBody.state || 'inactive'
            });

            const savedTest = await newTest.save();

            this.setStatus(201);
            return {
                id: (savedTest as any)._id.toString(),
                name: savedTest.name,
                sceneId: savedTest.sceneId,
                state: savedTest.state,
                createdAt: savedTest.createdAt
            };
        } catch (error: any) {
            console.error('Error creating test:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation error: ${validationErrors.join(', ')}`);
            }

            throw new Error(error.message || 'Failed to create test');
        }
    }

    /**
     * Create multiple tests at once
     */
    @Post('bulk')
    @SuccessResponse('201', 'Tests created successfully')
    public async createMultipleTests(@Body() requestBody: CreateMultipleTestsRequest): Promise<CreateMultipleTestsResponse> {
        try {
            // Validate ObjectId format for sceneId
            if (!requestBody.sceneId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid scene ID format');
            }

            // Check if scene exists
            const sceneExists = await SceneModel.findById(requestBody.sceneId);
            if (!sceneExists) {
                throw new Error('Scene not found');
            }

            // Validate that tests array is not empty
            if (!requestBody.tests || requestBody.tests.length === 0) {
                throw new Error('At least one test must be provided');
            }

            // Validate each test name
            for (const test of requestBody.tests) {
                if (!test.name || test.name.trim().length === 0) {
                    throw new Error('All tests must have a valid name');
                }
                if (test.name.length > 100) {
                    throw new Error('Test names cannot exceed 100 characters');
                }
            }

            const createdTests: TestResponse[] = [];
            const failedTests: { name: string; error: string }[] = [];

            // Create tests one by one to handle individual failures
            for (const testData of requestBody.tests) {
                try {
                    const newTest = new TestModel({
                        name: testData.name.trim(),
                        sceneId: requestBody.sceneId,
                        state: testData.state || 'inactive'
                    });

                    const savedTest = await newTest.save();

                    createdTests.push({
                        id: (savedTest as any)._id.toString(),
                        name: savedTest.name,
                        sceneId: savedTest.sceneId,
                        state: savedTest.state,
                        createdAt: savedTest.createdAt
                    });
                } catch (error: any) {
                    console.error(`Error creating test "${testData.name}":`, error);
                    failedTests.push({
                        name: testData.name,
                        error: error.message || 'Failed to create test'
                    });
                }
            }

            // Set appropriate status code
            if (createdTests.length > 0) {
                this.setStatus(201);
            } else {
                this.setStatus(400);
            }

            const response: CreateMultipleTestsResponse = {
                success: createdTests.length > 0,
                message: `${createdTests.length} test(s) created successfully${failedTests.length > 0 ? `, ${failedTests.length} failed` : ''}`,
                createdTests,
                ...(failedTests.length > 0 && { failedTests })
            };

            return response;
        } catch (error: any) {
            console.error('Error creating multiple tests:', error);
            throw new Error(error.message || 'Failed to create tests');
        }
    }

    /**
     * Start or stop a test by toggling its state
     * @param testId The test ID to start or stop
     */
    @Put('{testId}/start-stop')
    @SuccessResponse('200', 'Test state toggled successfully')
    public async startStopTest(@Path() testId: string): Promise<StartStopTestResponse> {
        try {
            // Validate ObjectId format
            if (!testId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid test ID format');
            }

            // Find the test
            const test = await TestModel.findById(testId);
            if (!test) {
                throw new Error('Test not found');
            }

            // Toggle the state
            const newState = test.state === 'active' ? 'inactive' : 'active';

            // Update the test state
            const updatedTest = await TestModel.findByIdAndUpdate(
                testId,
                { $set: { state: newState } },
                { new: true, runValidators: true }
            );

            if (!updatedTest) {
                throw new Error('Failed to update test state');
            }

            const message = newState === 'active' ? 'Test started successfully' : 'Test stopped successfully';

            return {
                id: (updatedTest as any)._id.toString(),
                name: updatedTest.name,
                sceneId: updatedTest.sceneId,
                state: updatedTest.state,
                message: message
            };
        } catch (error: any) {
            console.error('Error toggling test state:', error);

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid test ID format');
            }

            throw new Error(error.message || 'Failed to toggle test state');
        }
    }

    /**
     * Get a specific test by ID
     * @param testId The test ID to retrieve
     */
    @Get('{testId}')
    @SuccessResponse('200', 'Retrieved test successfully')
    public async getTestById(@Path() testId: string): Promise<TestResponse> {
        try {
            // Validate ObjectId format
            if (!testId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid test ID format');
            }

            const test = await TestModel.findById(testId);
            if (!test) {
                throw new Error('Test not found');
            }

            return {
                id: (test as any)._id.toString(),
                name: test.name,
                sceneId: test.sceneId,
                state: test.state,
                createdAt: test.createdAt
            };
        } catch (error: any) {
            console.error('Error fetching test:', error);

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid test ID format');
            }

            throw new Error(error.message || 'Failed to fetch test');
        }
    }
}