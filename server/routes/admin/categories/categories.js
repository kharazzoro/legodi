var express = require('express');
var router = express.Router();
const categoryClient = require('../../../dbClients/categoriesDB');
const articleClient = require('../../../dbClients/articlesDB')
const ObjectId = require('mongodb').ObjectID;


router.get('/', (req, res, next) => {
    const callback = (error, category) => {
        res.render("admin-list-categories", {
            category,
            categoryHome: 'homeNav'
        })
    }
    categoryClient.findCategories({}, callback);
});

router.get("/add", (req, res, next) => {
    res.render('admin-add-category', {
        addcategoryHome: 'homeNav'
    });
});

router.post('/add', (req, res, next) => {
    const query = req.body;
    const titleTranslation = {};

    titleTranslation.am = query.am;
    titleTranslation.ar = query.ar;

    query.titleTranslation = titleTranslation;

    if (query.icon == "") {
        query.icon = "default-icon"
    }
    const callback = () => {
        res.redirect("/admin/categories");
    }
    categoryClient.addCategory(query, callback);

});

router.get('/edit/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const callback = (error, category) => {
        res.render("admin-edit-category", {
            category: category,
            shortDescriptionTitle: "Edit short",
            descriptionTitle: "Edit"
        })
    }
    categoryClient.findCategoryById(categoryId, callback);
});



router.post('/delete/:categoryId', (req, res) => {
    const { categoryId } = req.params;

    callBack = (error, data) => {
        if (data.title === req.body.validationTitle) {

            deleteCallBack = () => {
                res.redirect('/admin/categories');
            }
            categoryClient.removeCategory(categoryId, deleteCallBack);

        } else {
            res.render("delete-title-wrong");
        }
    }
    categoryClient.findCategoryById(categoryId, callBack)
})

router.post('/edit/:categoryId', (req, res, next) => {
    const { categoryId } = req.params;
    const query = req.body;

     const titleTranslation = {};

    titleTranslation.am = query.am;
    titleTranslation.ar = query.ar;

    query.titleTranslation = titleTranslation;

    const callback = (error, category) => {
        res.redirect('/admin/categories')
    }

    categoryClient.editCategory(categoryId, query, true, callback);
});

module.exports = router;