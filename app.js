const BACKEND_CONSULTANTS = 'https://back-demo-001-cnacf2c3cta4embv.northeurope-01.azurewebsites.net';

$(document).ready(function() {
    // Initially hide the back button
    $('#back-btn').hide();

    function loadConsultants() {
        $.get(`${BACKEND_CONSULTANTS}/consultants`, function(data) {
            $('#consultant-list').empty();
            $('#skills-view').hide();
            $('#consultant-list').show();
            data.forEach(consultant => {
                $('#consultant-list').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${consultant.firstName} ${consultant.lastName} (CIN: ${consultant.CIN})
                        <button class="btn btn-primary show-skills-btn" data-id="${consultant._id}" data-name="${consultant.firstName} ${consultant.lastName}">Show Skills</button>
                    </li>
                `);
            });
        }).fail(function() {
            alert('Error loading consultants.');
        });
    }

    // Show skills of the selected consultant
    $(document).on('click', '.show-skills-btn', function() {
        const consultantId = $(this).data('id');
        const consultantName = $(this).data('name');
        $.get(`${BACKEND_CONSULTANTS}/consultants/${consultantId}`, function(consultant) {
            $('#consultant-list').hide();
            $('#skills-title').text(`Skills of ${consultantName}`);
            $('#skills-list').empty();
            consultant.skills.forEach(skill => {
                $('#skills-list').append(`<li class="list-group-item">${skill}</li>`);
            });
            $('#skills-view').show();
            $('#back-btn').show();  // Show the back button only when needed
        });
    });

    // Back to consultant list
    $('#back-btn').click(function() {
        $('#skills-view').hide();
        $('#back-btn').hide();  // Hide the back button when returning to the list
        loadConsultants();
    });

    // Load consultants initially
    loadConsultants();
});
