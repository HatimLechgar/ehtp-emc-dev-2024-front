const BACKEND_CONSULTANTS = 'https://back-demo-001-cnacf2c3cta4embv.northeurope-01.azurewebsites.net';

$(document).ready(function() {
    function loadConsultants() {
        $.get(`${BACKEND_CONSULTANTS}/consultants`, function(data) {
            $('#consultant-list').empty(); 
            $('#skills-view').hide();
            $('#consultant-list').show();
            data.forEach(consultant => {
                $('#consultant-list').append(`
                    <li class="list-group-item consultant-item" data-id="${consultant._id}">
                        ${consultant.firstName} ${consultant.lastName} (CIN: ${consultant.CIN})
                    </li>
                `);
            });
        }).fail(function() {
            alert('Error loading consultants.');
        });
    }

    $(document).on('click', '.consultant-item', function() {
        const consultantId = $(this).data('id');
        $.get(`${BACKEND_CONSULTANTS}/consultants/${consultantId}`, function(consultant) {
            $('#consultant-list').hide();
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
        loadConsultants();
    });

    loadConsultants();
});
