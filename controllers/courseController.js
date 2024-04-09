const { createCourse, getById, deleteById, updateById } = require('../services/courseService.js');
const { parseError } = require('../util/parser.js');

const courseController = require('express').Router();


courseController.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Course'
    });
});
courseController.get('/:id', async (req, res) => {
    const course = await getById(req.params.id);

    // course.isOwner = course.owner.toString() == req.user._id.toString();

    res.render('details', {
        title: course.title,
        course
    });
});

courseController.get('/:id/delete', async (req, res) => {
    const course = await getById(req.params.id);
    if (course.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }

    await deleteById(req.params.id);
    res.redirect('/');
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

courseController.get('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
    if (course.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }
    res.render('edit', {
        title: 'Edit Course',
        course
    });
});

courseController.post('/:id/edit', async (req, res) => {
    const course = await getById(req.params.id);
    if (course.owner.toString() != req.user._id.toString()) {
        return res.redirect('/auth/login');
    }
    try {
        await updateById(req.params.id, req.body);
        
        res.redirect(`/course/${req.params.id}`);
    } catch (err) {
        res.render('edit', {
            title: 'Edit Course',
            errors: parseError(err),
            course: req.body,
        });
    }
});
module.exports = courseController;