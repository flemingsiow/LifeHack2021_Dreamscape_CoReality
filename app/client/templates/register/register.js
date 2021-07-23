
/* Register: Event Handlers */

Template.Register.events({
	'submit .register-form': function(event) {
		event.preventDefault()
		var firstName = $('#registerFirstName').val()
		var lastName = $('#registerLastName').val()
		var email = $('#registerEmail').val()
		var password = $('#registerPassword').val()
		var accountType = $('#registerAccountType').val()
		var SID = $('#registerSID').val()
		
		if (accountType == 'instructor') Session.set('validSID', true)

		if (Session.get("validPassword") && Session.get("validEmail") && 
			Session.get("validSID") && firstName != "" && lastName != "" 
			&& accountType != "") {
			options = {
				_id: SID,
				first_name: firstName,
				last_name: lastName,
				email: email,
				password: password,
				accountType: accountType
			}
			Accounts.createUser(options, function(error) {
				if (error) {
					console.log(error)
					if (error.error == 403) {
						$("#registerEmail").removeClass("valid")
						$("#registerEmail").addClass("invalid")
						$("#registerEmail-label").attr("data-error", 
							"Email already exists")
						Session.set("validEmail", false)
					} else if (error.error == 500) {
						$("#registerSID").removeClass("valid")
						$("#registerSID").addClass("invalid")
						$("#registerSID-label").attr("data-error", 
							"Account with this SID has already been registered")
					}
				} else {
					resetInput()
					$('#register-modal').modal('close')
				}
			});
		} else {
			Materialize.toast('Please check your information', 4000)
		}
	},
	'keyup #registerPassword': function() {
		// check if username already taken or invalid format
		var input = $('#registerPassword').val()

		if (input.length >= 6) {
			$('#registerPassword').addClass("valid")
			$("#registerPassword").removeClass("invalid")
			Session.set("validPassword", true)
		} else {
			$("#registerPassword").removeClass("valid")
			$("#registerPassword").addClass("invalid")
			$("#registerPassword-label").attr("data-error", 
				"Password must be at least 6 characters long")
			Session.set("validPassword", false)
		}
	},
	'keyup #registerEmail': function() {
		// check if email is valid or already exist
		var input = $('#registerEmail').val()
		var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(gmail.com)$/;
		if (regex.test(input)) {
			$('#registerEmail').addClass("valid")
			$("#registerEmail").removeClass("invalid")
			Session.set("validEmail", true)
		} else {
			$("#registerEmail").removeClass("valid")
			$("#registerEmail").addClass("invalid")
			$("#registerEmail-label").attr("data-error", 
				"Invalid Email (@gmail.com required)")
			Session.set("validEmail", false)
		}
	},
	'keyup #registerSID': function() {
		var input = $('#registerSID').val()
		if (input.length == 7) {
			$('#registerSID').addClass("valid")
			$("#registerSID").removeClass("invalid")
			Session.set("validSID", true)
		} else {
			$("#registerSID").removeClass("valid")
			$("#registerSID").addClass("invalid")
			$("#registerSID-label").attr("data-error", "Invalid SID")
			Session.set("validSID", false)
		}
	},
	'change #registerAccountType': function() {
		if ($('#registerAccountType').val() == 'student') {
			Session.set('studentAccount', true)
		} else {
			Session.set('studentAccount', false)
		}
	},
	'click #register-cancel': function() {
		resetInput()
		$('#register-modal').modal('close')
	}
});


/* Register: Helpers */

Template.Register.helpers({
	'showSIDField': function() {
		return Session.get('studentAccount')
	}
});

function resetInput() {
	$('#registerFirstName').val('')
	$("#registerFirstName-label").removeClass("active")
	$('#registerLastName').val('')
	$("#registerLastName-label").removeClass("active")
	$('#registerEmail').val('')
	$('#registerEmail').addClass("valid")
	$("#registerEmail").removeClass("invalid")
	$("#registerEmail-label").removeClass("active")
	$('#registerPassword').val('')
	$('#registerPassword').addClass("valid")
	$("#registerPassword-label").removeClass("active")
	$("#registerEmail-label").removeClass("active")
	$('#registerAccountType').val('')
	$('#registerSID').val('')
	$("#registerSID").addClass("valid")
	$("#registerSID").removeClass("invalid")
	$("#registerSID-label").removeClass("active")
}


/* Register: Lifecycle Hooks */

Template.Register.onCreated(function () {
});

Template.Register.onRendered(function () {
	// initialize material design select
	$(document).ready(function() {
		$('select').material_select()
	})
	Session.set("validEmail", false)
	Session.set("validPassword", false)
	Session.set("validSID", false)
	Session.set('studentAccount', false)
});

Template.Register.onDestroyed(function () {
});
