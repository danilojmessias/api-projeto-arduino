import { Controller, Get, Post, Put, Delete, Body, Path, Route, Tags, SuccessResponse } from 'tsoa';
import { CreateDeviceRequest, UpdateDeviceRequest, DeviceResponse } from '../models/Device';
import { DeviceModel, IDevice } from '../models/DeviceModel';
import { SceneModel } from '../models/SceneModel';

@Route('devices')
@Tags('Devices')
export class DeviceController extends Controller {

    /**
     * Get all devices
     */
    @Get()
    @SuccessResponse('200', 'Retrieved devices successfully')
    public async getDevices(): Promise<DeviceResponse[]> {
        try {
            const devices = await DeviceModel.find().sort({ createdAt: -1 });

            return devices.map(device => ({
                id: (device as any)._id.toString(),
                name: device.name,
                ip: device.ip,
                createdAt: device.createdAt
            }));
        } catch (error) {
            console.error('Error fetching devices:', error);
            throw new Error('Failed to fetch devices');
        }
    }


    /**
     * Add a new device
     */
    @Post()
    @SuccessResponse('201', 'Device created successfully')
    public async createDevice(@Body() requestBody: CreateDeviceRequest): Promise<DeviceResponse> {
        try {
            const newDevice = new DeviceModel({
                name: requestBody.name,
                ip: requestBody.ip
            });

            const savedDevice = await newDevice.save();

            this.setStatus(201);
            return {
                id: (savedDevice as any)._id.toString(),
                name: savedDevice.name,
                ip: savedDevice.ip,
                createdAt: savedDevice.createdAt
            };
        } catch (error: any) {
            console.error('Error creating device:', error);

            // Handle duplicate IP error
            if (error.code === 11000) {
                throw new Error('A device with this IP address already exists');
            }

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation error: ${validationErrors.join(', ')}`);
            }

            throw new Error('Failed to create device');
        }
    }

    /**
     * Update a device by ID
     */
    @Put('{deviceId}')
    @SuccessResponse('200', 'Device updated successfully')
    public async updateDevice(
        @Path() deviceId: string,
        @Body() requestBody: UpdateDeviceRequest
    ): Promise<DeviceResponse> {
        try {
            // Validate ObjectId format
            if (!deviceId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid device ID format');
            }

            const updatedDevice = await DeviceModel.findByIdAndUpdate(
                deviceId,
                { $set: requestBody },
                { new: true, runValidators: true }
            );

            if (!updatedDevice) {
                throw new Error('Device not found');
            }

            return {
                id: (updatedDevice as any)._id.toString(),
                name: updatedDevice.name,
                ip: updatedDevice.ip,
                createdAt: updatedDevice.createdAt
            };
        } catch (error: any) {
            console.error('Error updating device:', error);

            // Handle duplicate IP error
            if (error.code === 11000) {
                throw new Error('A device with this IP address already exists');
            }

            // Handle validation errors
            if (error.name === 'ValidationError') {
                const validationErrors = Object.values(error.errors).map((err: any) => err.message);
                throw new Error(`Validation error: ${validationErrors.join(', ')}`);
            }

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid device ID format');
            }

            throw new Error(error.message || 'Failed to update device');
        }
    }

    /**
     * Delete a device by ID
     */
    @Delete('{deviceId}')
    @SuccessResponse('200', 'Device deleted successfully')
    public async deleteDevice(@Path() deviceId: string): Promise<{ message: string }> {
        try {
            // Validate ObjectId format
            if (!deviceId.match(/^[0-9a-fA-F]{24}$/)) {
                throw new Error('Invalid device ID format');
            }

            const deletedDevice = await DeviceModel.findByIdAndDelete(deviceId);

            if (!deletedDevice) {
                throw new Error('Device not found');
            }

            return {
                message: 'Device deleted successfully'
            };
        } catch (error: any) {
            console.error('Error deleting device:', error);

            // Handle cast errors (invalid ObjectId)
            if (error.name === 'CastError') {
                throw new Error('Invalid device ID format');
            }

            throw new Error(error.message || 'Failed to delete device');
        }
    }

    /**
     * Delete all devices and their related scenes
     */
    @Delete()
    @SuccessResponse('200', 'All devices and scenes deleted successfully')
    public async deleteAllDevices(): Promise<{ message: string; deletedDevices: number; deletedScenes: number }> {
        try {
            // First, get all device IDs to know which scenes to delete
            const devices = await DeviceModel.find({}, '_id');
            const deviceIds = devices.map(device => (device as any)._id.toString());

            // Delete all scenes related to these devices
            const sceneDeleteResult = await SceneModel.deleteMany({
                deviceId: { $in: deviceIds }
            });

            // Delete all devices
            const deviceDeleteResult = await DeviceModel.deleteMany({});

            return {
                message: 'All devices and related scenes deleted successfully',
                deletedDevices: deviceDeleteResult.deletedCount || 0,
                deletedScenes: sceneDeleteResult.deletedCount || 0
            };
        } catch (error: any) {
            console.error('Error deleting all devices and scenes:', error);
            throw new Error(error.message || 'Failed to delete all devices and scenes');
        }
    }
}