import mongoose, { Schema, Document } from 'mongoose';

export interface IDevice extends Document {
    name: string;
    ip: string;
    createdAt: Date;
    updatedAt: Date;
}

const DeviceSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Device name is required'],
        trim: true,
        maxlength: [100, 'Device name cannot exceed 100 characters']
    },
    ip: {
        type: String,
        required: [true, 'IP address is required'],
        trim: true,
        validate: {
            validator: function (v: string) {
                // Basic IP validation regex
                return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(v);
            },
            message: 'Please enter a valid IP address'
        }
    },
}, {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    collection: 'devices' // Specify collection name
});

// Create indexes for better performance
DeviceSchema.index({ name: 1 });
DeviceSchema.index({ ip: 1 }, { unique: true }); // Ensure IP addresses are unique

// Export the model
export const DeviceModel = mongoose.model<IDevice>('Device', DeviceSchema);