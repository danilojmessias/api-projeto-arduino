import { Controller, Get, Post, Put, Delete, Body, Path, Route, Tags, SuccessResponse, Query } from 'tsoa';
import { CreateSceneRequest, UpdateSceneRequest, SceneResponse } from '../models/Scene';
import { SceneModel, IScene } from '../models/SceneModel';
import { DeviceModel } from '../models/DeviceModel';

@Route('scenes')
@Tags('Scenes')
export class SceneController extends Controller {

    /**
     * Get all scenes for a specific device
     * @param deviceId The device ID to get scenes for
     */
    @Get()
    @SuccessResponse('200', 'Retrieved scenes successfully')
    public async getScenesByDevice(@Query() deviceId: string): Promise<SceneResponse[]> {
        try {
            if (!deviceId) {
                throw new Error('Device ID is required');
            }

            // Validate ObjectId format
            if (!deviceId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid device ID format');
            }

            // Check if device exists
            const deviceExists = await DeviceModel.findById(deviceId);
            if (!deviceExists) {
                throw new Error('Device not found');
            }

            // Find scenes by device ID
            const scenes = await SceneModel.find({ deviceId }).sort({ createdAt: -1 });

            return scenes.map(scene => ({
                id: (scene as any)._id.toString(),
                name: scene.name,
                deviceId: scene.deviceId,
                createdAt: scene.createdAt
            }));
        } catch (error: any) {
            console.error('Error fetching scenes:', error);
            throw new Error(error.message || 'Failed to fetch scenes');
        }
    }

    /**
     * Create a new scene
     */
    @Post()
    @SuccessResponse('201', 'Scene created successfully')
    public async createScene(@Body() requestBody: CreateSceneRequest): Promise<SceneResponse> {
        try {
            // Validate ObjectId format for deviceId
            if (!requestBody.deviceId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid device ID format');
            }

            // Check if device exists
            const deviceExists = await DeviceModel.findById(requestBody.deviceId);
            if (!deviceExists) {
                throw new Error('Device not found');
            }

            const newScene = new SceneModel({
                name: requestBody.name,
                deviceId: requestBody.deviceId
            });

            const savedScene = await newScene.save();

            this.setStatus(201);
            return {
                id: (savedScene as any)._id.toString(),
                name: savedScene.name,
                deviceId: savedScene.deviceId,
                createdAt: savedScene.createdAt
            };
        } catch (error: any) {
            console.error('Error creating scene:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation error: ${validationErrors.join(', ')}`);
            }

            throw new Error(error.message || 'Failed to create scene');
        }
    }

    /**
     * Update a scene by ID
     */
    @Put('{sceneId}')
    @SuccessResponse('200', 'Scene updated successfully')
    public async updateScene(
        @Path() sceneId: string,
        @Body() requestBody: UpdateSceneRequest
    ): Promise<SceneResponse> {
        try {
            // Validate ObjectId format
            if (!sceneId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid scene ID format');
            }

            // If deviceId is being updated, validate it
            if (requestBody.deviceId) {
                if (!requestBody.deviceId.match(/^[0-9a-fA-F]{24}$/)) {
                    throw new Error('Invalid device ID format');
                }

                // Check if device exists
                const deviceExists = await DeviceModel.findById(requestBody.deviceId);
                if (!deviceExists) {
                    throw new Error('Device not found');
                }
            }

            const updatedScene = await SceneModel.findByIdAndUpdate(
                sceneId,
                { $set: requestBody },
                { new: true, runValidators: true }
            );

            if (!updatedScene) {
                throw new Error('Scene not found');
            }

            return {
                id: (updatedScene as any)._id.toString(),
                name: updatedScene.name,
                deviceId: updatedScene.deviceId,
                createdAt: updatedScene.createdAt
            };
        } catch (error: any) {
            console.error('Error updating scene:', error);

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation error: ${validationErrors.join(', ')}`);
            }

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid scene ID format');
            }

            throw new Error(error.message || 'Failed to update scene');
        }
    }

    /**
     * Delete a scene by ID
     */
    @Delete('{sceneId}')
    @SuccessResponse('200', 'Scene deleted successfully')
    public async deleteScene(@Path() sceneId: string): Promise<{ message: string }> {
        try {
            // Validate ObjectId format
            if (!sceneId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid scene ID format');
            }

            const deletedScene = await SceneModel.findByIdAndDelete(sceneId);

            if (!deletedScene) {
                throw new Error('Scene not found');
            }

            return {
                message: 'Scene deleted successfully'
            };
        } catch (error: any) {
            console.error('Error deleting scene:', error);

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid scene ID format');
            }

            throw new Error(error.message || 'Failed to delete scene');
        }
    }
}