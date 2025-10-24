export interface Scene {
    id: string;
    name: string;
    deviceId: string;
}

export interface CreateSceneRequest {
    name: string;
    deviceId: string;
}

export interface UpdateSceneRequest {
    name?: string;
    deviceId?: string;
}

export interface SceneResponse {
    id: string;
    name: string;
    deviceId: string;
    createdAt: Date;
}