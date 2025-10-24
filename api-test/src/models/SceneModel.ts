import mongoose, { Schema, Document } from 'mongoose';

export interface IScene extends Document {
    name: string;
    deviceId: string;
    createdAt: Date;
    updatedAt: Date;
}

const SceneSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Scene name is required'],
        trim: true,
        maxlength: [100, 'Scene name cannot exceed 100 characters']
    },
    deviceId: {
        type: String,
        required: [true, 'Device ID is required'],
        validate: {
            validator: function (v: string) {
                // Validate ObjectId format
                return /^[0-9a-fA-F]{24}$/.test(v);
            },
            message: 'Please enter a valid device ID'
        }
    }
}, {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    collection: 'scenes' // Specify collection name
});

// Create indexes for better performance
SceneSchema.index({ name: 1 });
SceneSchema.index({ deviceId: 1 }); // Index for querying scenes by device

// Export the model
export const SceneModel = mongoose.model<IScene>('Scene', SceneSchema);