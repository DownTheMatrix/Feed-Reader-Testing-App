$(function () {
    /* 1st Suite: RSS Feeds */
    describe('RSS Feeds', function () {

        /* This ensures that the allFeeds variable has been defined and that it's not empty */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loops through each feed urls to ensure that they're defined and not empty */
        it('should contain a URL defined which is not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* Loops through each feed name to ensure that they're defined and not empty */
        it('should contain a name which is defined and not empty', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    /* 2nd Suite: The Menu  */
    describe('The menu', function () {

        /* Ensures that the menu element is hidden by default */
        it('should be hidden by default', function () {
            const body = $('body');

            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* Checks that the menu visibility changes when the menu icon is clicked */
        it('should change visibility when the menu icon is clicked', function () {
            const menuIcon = $('a.menu-icon-link'); // Select menu-icon
            const body = $('body');

            menuIcon.trigger('click'); // Listens for a click event...
            expect(body.hasClass('menu-hidden')).toBe(false); // and displays the menu
            menuIcon.trigger('click'); // Once clicked again...
            expect(body.hasClass('menu-hidden')).toBe(true); // it hides the menu
        });
    });

    /* 3rd Suite: Initial Entries */
    describe('Initial Entries', function () {

        /* Jasmine built-in function for dealing with asynchronous code  */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* This tests ensures that once the loadFeed function has been called, there's at least a single .entry element within the .feed container */
        it('there should be at least a single .entry element within the .feed container', function () {
            const feedContainer = $('.feed'); // Selects the feeds container
            const entry = $('.entry'); // Selects the entry
            const entriesWithinContainer = $('.feed .entry'); // Selects the feed container (parent) and the entry element (child)

            expect(entriesWithinContainer.length).toBeGreaterThan(0);
            expect(entry, feedContainer).toBeDefined();

            /* if ( $(feedContainer).has(entry).length ) {
                console.log("entry present within container");
            } else {
                console.log("entry not present within container");
            } */
        });

        /* Expects the entries to be valid URLs using regular expression */
        it('entries are valid URLs', function (done) {
            const feedContainer = $('.feed'); // Selects the feeds container
            const entryLinks = document.querySelectorAll('.entry-link'); // Selects the entries links

            entryLinks.forEach(function (entry) {
                expect(entry.href).toMatch(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i); // Regex taken from: (https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url)
                done();
            });
        });
    });

    /* 4th Suite: New Feed Selection */
    describe('New Feed Selection', function () {

        let oldFeedContent;  // Makes the variable accessible from within the beforeEach() funtion
        let newFeedContent;  // Makes the variable accessible from within the beforeEach() funtion

        beforeEach(function (done) {
            loadFeed(0, function () {
                oldFeedContent = $('.feed').html(); // Selects the original (empty) feed content
                done();
                
                loadFeed(1, function () {
                    newFeedContent = $('.feed').html(); // Selects the new feed content
                    done();
                });
            });
        });

        /* Makes sure that the content changes once a new feed has been loaded */
        it('when a new feed is loaded, the content should change', function (done) {
        
            expect(oldFeedContent).not.toBe(newFeedContent); // Ensures that the new content is different from the old one (= sth. was added and the content changed)
            done();
        });
    });
}());