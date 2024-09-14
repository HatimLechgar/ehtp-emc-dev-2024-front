const BACKEND_CONSULTANTS = 'https://back-demo-001-cnacf2c3cta4embv.northeurope-01.azurewebsites.net';
const BACKEND_INTELL_MISSION_PROPOSER = 'https://fnc-missions-001.azurewebsites.net/api/missions-proposer-Http?code=Mo4C2BWGDk3_ybsXc9p_2PVM4fsNhcrf5sq9-UPoYkcDAzFuICMM4A==';


    
$(document).ready(function() {

    
    $('#skills-view').hide();
    $('#back-btn').hide();
    $('#missions-view').hide();
    
    let currentSkills = [];

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
            currentSkills = consultant.skills;
            $('#skills-list').empty();
            consultant.skills.forEach(skill => {
                $('#skills-list').append(`<li class="list-group-item">${skill}</li>`);
            });
            $('#skills-view').show();
            $('#back-btn').show();
        });
    });

    $('#back-btn').click(function() {
        $('#skills-view').hide();
        $('#back-btn').hide();
        $('#missions-view').hide();  // Hide the missions list when going back
        loadConsultants();
    });
    // Suggest missions based on skills
   $('#suggest-missions-btn').click(function() {
        $.ajax({
            url: `${BACKEND_INTELL_MISSION_PROPOSER}`,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ skills: currentSkills }),
            success: function(missions) {
                $('#missions-list').empty();
                if (missions.length > 0) {
                    missions.forEach(mission => {
                        $('#missions-list').append(`<li class="list-group-item">${mission.name}</li>`);
                    });
                } else {
                    $('#missions-list').append(`<li class="list-group-item">No matching missions found</li>`);
                }
                $('#missions-view').show();
            },
            error: function() {
                alert('Error suggesting missions.');
            }
        });
    });
    
    // Load consultants initially
    loadConsultants();
});
