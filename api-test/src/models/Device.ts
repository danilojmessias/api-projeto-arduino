export interface Device {
    id: string;
    name: string;
    ip: string;
}

export interface CreateDeviceRequest {
    name: string;
    ip: string;
}

export interface UpdateDeviceRequest {
    name?: string;
    ip?: string;
}

export interface DeviceResponse {
    id: string;
    name: string;
    ip: string;
    createdAt: Date;
}