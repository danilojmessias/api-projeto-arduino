import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
    name: string;
    sceneId: string;
    state: 'active' | 'inactive';
    createdAt: Date;
    updatedAt: Date;
}

const TestSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Test name is required'],
        trim: true,
        maxlength: [100, 'Test name cannot exceed 100 characters']
    },
    sceneId: {
        type: String,
        required: [true, 'Scene ID is required'],
        validate: {
            validator: function (v: string) {
                // Validate ObjectId format
                return /^[0-9a-fA-F]{24}$/.test(v);
            },
            message: 'Please enter a valid scene ID'
        }
    },
    state: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'inactive',
        required: [true, 'Test state is required']
    }
}, {
    timestamps: true, // This automatically adds createdAt and updatedAt fields
    collection: 'tests' // Specify collection name
});

// Create indexes for better performance
TestSchema.index({ name: 1 });
TestSchema.index({ sceneId: 1 }); // Index for querying tests by scene
TestSchema.index({ state: 1 }); // Index for querying tests by state
TestSchema.index({ sceneId: 1, state: 1 }); // Compound index for scene and state queries

// Export the model
export const TestModel = mongoose.model<ITest>('Test', TestSchema);