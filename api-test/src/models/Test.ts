export interface Test {
    id: string;
    name: string;
    sceneId: string;
    state: 'active' | 'inactive';
}

export interface CreateTestRequest {
    name: string;
    sceneId: string;
    state?: 'active' | 'inactive';
}

export interface UpdateTestRequest {
    name?: string;
    sceneId?: string;
    state?: 'active' | 'inactive';
}

export interface TestResponse {
    id: string;
    name: string;
    sceneId: string;
    state: 'active' | 'inactive';
    createdAt: Date;
}

export interface StartStopTestRequest {
    testId: string;
}

export interface StartStopTestResponse {
    id: string;
    name: string;
    sceneId: string;
    state: 'active' | 'inactive';
    message: string;
}

export interface CreateMultipleTestsRequest {
    sceneId: string;
    tests: {
        name: string;
        state?: 'active' | 'inactive';
    }[];
}

export interface CreateMultipleTestsResponse {
    success: boolean;
    message: string;
    createdTests: TestResponse[];
    failedTests?: {
        name: string;
        error: string;
    }[];
}