import Papa from 'papaparse'

/* createNewCourse: Event Handlers */

Template.CreateNewCourse.events({
	'submit .create-new-course-form': function(event) {
		// Prevent default browser form submit
		event.preventDefault();
		// Get values from form element
		console.log(event);
		var title = event.target.newCourseName.value;
		var code = event.target.newCourseCode.value.toUpperCase();
		var description = event.target.newCourseDescription.value;
		var file = event.target[3].files[0];

		if (title == "") {
			// check if course title is empty
			$('#newCourseName').removeClass('valid')
			$('#newCourseName').addClass('invalid')
			$('#newCourseName-label').attr("data-error", "Course title cannot be empty")
			Session.set("validCourseName", false)
			
		} else if (code == "") {
			// check if course code is empty
			$('#newCourseCode').removeClass('valid')
			$('#newCourseCode').addClass('invalid')
			$('#newCourseCode-label').attr("data-error", "Course code cannot be empty")
			Session.set("validCourseCode", false)
		} else if (description == "") {
			// check if course description is empty
			$('#newCourseDescription').removeClass('valid')
			$('#newCourseDescription').addClass('invalid')
			$('#newCourseDescription-label').attr("data-error", "Course description cannot be empty")
			Session.set("validCourseDescription", false)
		} else if (Session.get("validCourseCode")) {
			var courseInfo = {}
			courseInfo.title = title
			courseInfo.code = code.toUpperCase()
			courseInfo.description = description
            if(file) {
                Papa.parse(file, {
                    header: true,
                    complete: function (results, file) {
                        if (results.error) {
                            Materialize.toast('CSV Parse Error: ' + results.error)
                        } else if (results.meta.fields.indexOf('StudentID') < 0 ||
                            results.meta.fields.indexOf('Group') < 0) {
                            Materialize.toast('Incorrect CSV format')
                        } else {
                            Meteor.call('addCourse', courseInfo,
                                results.data, function (error) {
                                    if (error) console.log(error)
                                    else  {
                                    	Materialize.toast('Course added and Enrolled Students')
                                        Router.go('/course/' + courseInfo.code)
                                    }
                                }
                            )
                        }
                    }
                })
            }
            else{
                Meteor.call('addCourse', courseInfo, null, function(error, result) {
                    if (error) {
                        console.log(error)
                        Materialize.toast('Error: ' + error.message, 8000)
                    } else {
                        Materialize.toast('Course ' + code + " added.", 4000)
                        Router.go('/course/' + courseInfo.code)
                    }
                })
			}
		}
	},
	'click #cancel': function() {
		Router.go('/');
	},
	'keyup #newCourseCode': function() {
		var input  = $('#newCourseCode').val().toUpperCase()

		if (input.length == 0) {
			$('#newCourseCode').removeClass('valid')
			$('#newCourseCode').removeClass('invalid')
			Session.set("validCourseCode", false)
		} else if (input.indexOf(' ') >= 0) {
			// check if course code has whitespace
			$('#newCourseCode').removeClass('valid')
			$('#newCourseCode').addClass('invalid')
			$('#newCourseCode-label').attr("data-error", "Course code cannot contains space")
			Session.set("validCourseCode", false)
		} else if (Courses.findOne({'code':input})) {
			// check if course with same course code already exist
			$('#newCourseCode').removeClass('valid')
			$('#newCourseCode').addClass('invalid')
			$('#newCourseCode-label').attr("data-error", "Course with this course code already exist")
			Session.set("validCourseCode", false)
		} else {
			$('#newCourseCode').addClass('valid')
			$('#newCourseCode').removeClass('invalid')
			Session.set("validCourseCode", true)
		}
	},
});


/* createNewCourse: Helpers */

Template.CreateNewCourse.helpers({

});


/* createNewCourse: Lifecycle Hooks */

Template.CreateNewCourse.onCreated(function () {
});

Template.CreateNewCourse.onRendered(function () {
	// initialize validCourseCode and validPassword as false
	Session.set("validCourseCode", false)
	Session.set("validPassword", false)
});

Template.CreateNewCourse.onDestroyed(function () {
});
