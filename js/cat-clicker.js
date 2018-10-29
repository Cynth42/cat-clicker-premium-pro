
/* ======= Model ======= */
const model = {

    currentCat: null,

    cats: [
            {
                name: 'Tom',
                image: './images/cat-one.jpg',
                count: 0
            },
            {
                name: 'Jerry',
                image: './images/cat-two.jpg',
                count: 0
            },
            {
                name: 'Fluffy',
                image: './images/cat-three.jpg',
                count: 0
            },
            {
                name: 'Speedy',
                image: './images/cat-four.jpg',
                count: 0
            },

        ]
}

/* ======= Octopus ======= */
const catList = {

    init: function() {
        this.catList = document.querySelector('#cat-list');
        this.render();
    },

    render: function() {
        const cats = octopus.getCats();
        for (let i = 0; i < cats.length; i++) {
            const cat = cats[i];
            const li = document.createElement('li');
            li.textContent=`Cat${i+1}`
            this.catList.append(li);
            li.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                    admin.render();
                }
            })(cat));
        }
    }
}

/* ======= View ======= */
const catView = {

    init: function() {
        this.catName = document.querySelector('#cat-name');
        this.catCounter = document.querySelector('#cat-counter');
        this.catImage = document.querySelector('#cat-image');
        this.catImage.addEventListener('click', function() {
            octopus.incrementCurrentCatCount();
            admin.render();
        });
        this.render();
    },

    render: function() {
        const cat = octopus.getCurrentCat();
        this.catName.textContent = cat.name;
        this.catCounter.textContent = cat.count;
        this.catImage.src = cat.image;
    }
}

const admin = {

    init: function() {
        this.adminBtn = document.querySelector('#admin-btn');
        this.adminForm = document.querySelector('#admin-form');
        this.adminCatName = document.querySelector('#admin-cat-name');
        this.adminCatImage = document.querySelector('#admin-cat-image');
        this.adminCatCounter = document.querySelector('#admin-cat-counter');
        this.adminSave = document.querySelector('#admin-save');
        this.adminCancel = document.querySelector('#admin-cancel');

        this.adminBtn.addEventListener('click',
        ()=> {
            this.adminForm.classList.toggle('hide');
        });

        this.adminSave.addEventListener('click', (event) => {
            event.preventDefault();
            octopus.updateCat();
        });

        this.adminCancel.addEventListener('click', (event) => {
            event.preventDefault();
            this.adminForm.classList.toggle('hide');
            this.render();
        })

        this.render();
    },

    render: function() {
        const cat = octopus.getCurrentCat();
        this.adminCatName.value = cat.name;
        this.adminCatImage.value = cat.image;
        this.adminCatCounter.value = cat.count;
    }
}

/* ======= Octopus ======= */
const octopus = {
    init: function() {
        model.currentCat = model.cats[0];
        catList.init();
        catView.init();
        admin.init();
    },

    getCats: function() {
        return model.cats;
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    incrementCurrentCatCount: function() {
        model.currentCat.count++;
        catView.render();
    },

    updateCat: function() {
        model.currentCat.name = admin.adminCatName.value;
        model.currentCat.image = admin.adminCatImage.value;
        model.currentCat.count = admin.adminCatCounter.value;
        catView.render();
    }
}
octopus.init();
