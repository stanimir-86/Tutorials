const Course = require("../models/Course.js");


async function getAllByDate() {
    return Course.find({}).sort({ createdAt: 1 }).lean();
}

async function getRecent() {

    return Course.find({}).sort({ userCount: -1 }).limit(3).lean();

}

async function getById(id) {
    return Course.findById(id).lean();

}

async function createCourse(course) {
    return Course.create(course);
}

async function deleteById(id) {
    return Course.findByIdAndDelete(id);
}
async function updateById(id, data) {
    const existing = await Course.findById(id);
    existing.title = data.title;
    existing.imageUrl = data.imageUrl;
    existing.description = data.description;
    existing.duration = data.duration;

    return existing.save();
}

module.exports = {
    getAllByDate,
    createCourse,
    getRecent,
    getById,
    deleteById,
    updateById,
}