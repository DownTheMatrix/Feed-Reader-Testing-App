/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should contain a URL defined which is not empty', function () {
            allFeeds.forEach(function (feed) {  // Loops through each feed urls to ensure that they're defined and not empty
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('should contain a name which is defined and not empty', function () {
            allFeeds.forEach(function (feed) {  // Loops through each feed name to ensure that they're defined and not empty
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            })
        });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function () {
            const body = $('body'); // Select the document body

            expect(body.hasClass('menu-hidden')).toBe(true);
        });

        /* TODO: Write a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('should change visibility when the menu icon is clicked', function () {
            const menuIcon = $('a.menu-icon-link'); // Select menu-icon
            const body = $('body');

            menuIcon.trigger('click'); // Listens for a click event...
            expect(body.hasClass('menu-hidden')).toBe(false); // and displays the menu
            menuIcon.trigger('click'); // Once clicked again...
            expect(body.hasClass('menu-hidden')).toBe(true); // it hides the menu
        });
    });

    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {  // "This spec will not start until the done function is called in the call to beforeEach above. And this spec will not complete until its done is called." (from Jasmine Doc)
            loadFeed(0, done);
        });

        it('there should be at least a single .entry element within the .feed container', function () {
            const feedContainer = $('.feed'); // Selects the feeds container
            const entry = $('.entry');  // Selects the entry

            expect(feedContainer.length).toBeGreaterThan(0);
            expect(entry.length).toBeGreaterThan(0);
        });

        // Expects the entries to be valid URLs using regular expression
        it('entries are valid URLs', function (done) {
            const feedContainer = $('.feed'); // Selects the feeds container
            const entryLinks = document.querySelectorAll('.entry-link');  // Selects the entries links

            entryLinks.forEach(function (entry) {
                expect(entry.href).toMatch(/^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i);  // Regex taken from: (https://stackoverflow.com/questions/161738/what-is-the-best-regular-expression-to-check-if-a-string-is-a-valid-url)
                done();
            });
        });
    });


    /* TODO: Write a new test suite named "New Feed Selection" */

    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
}());