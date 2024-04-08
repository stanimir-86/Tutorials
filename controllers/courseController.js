const { createCourse, getAllByDate, getById } = require('../services/courseService.js');
const { parseError } = require('../util/parser.js');

const courseController = require('express').Router();


courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Course'
    });
});
courseController.get('/:id', async (req, res) => {
    const course = await getById(req.params.id);

    course.isOwner = course.owner.toString() == req.user._id.toString();

    res.render('details', {
        title: course.title,
        course
    });
});

courseController.post('/create', async (req, res) => {
    const course = {
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        duration: req.body.duration,
        owner: req.body._id,
    };
    try {
        await createCourse(course);
        res.redirect('/');
    } catch (err) {
        const errors = parseError(err);
        res.render('create', {
            title: 'Create Course',
            errors: parseError(err),
            body: course
        });
    }

});

module.exports = courseController;