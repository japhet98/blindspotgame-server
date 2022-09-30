const baseSchema = {
    created_at: { type: Date, required: true, default: Date.now },
    isDeleted: { type: Boolean, default: false, select: false },
    isDisabled: { type: Boolean, default: false, select: false },
    updated_at: { type: Date, required: true, default: Date.now },
}

export default baseSchema;