const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PortalSchema = new Schema({
    CreatedBy: { type: String },
    CreatedDate: { type: Date, default: Date.now },
    Deleted: { type: Boolean },
    ModifiedBy: { type: String },
    ModifiedDate: { type: Date },
    PortalName: { type: String, required: true },
    Status: { type: Number, required: true },
    // projects: [{ type: Schema.Types.ObjectId, ref: 'Project' }]

})

module.exports = mongoose.model("Portal",PortalSchema)
