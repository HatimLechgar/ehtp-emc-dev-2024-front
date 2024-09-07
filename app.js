$(document).ready(function() {
    function loadConsultants() {
        $.get('http://localhost:3000/consultants', function(data) {
            $('#consultant-list').empty(); // Clear the list before appending
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

    // Show skills of the selected consultant
    $(document).on('click', '.consultant-item', function() {
        const consultantId = $(this).data('id');
        $.get(`http://localhost:3000/consultants/${consultantId}`, function(consultant) {
            $('#consultant-list').hide();
            $('#skills-list').empty();
            consultant.skills.forEach(skill => {
                $('#skills-list').append(`<li class="list-group-item">${skill}</li>`);
            });
            $('#skills-view').show();
            $('#back-btn').show();
        });
    });

    // Back to consultant list
    $('#back-btn').click(function() {
        $('#skills-view').hide();
        $('#back-btn').hide();
        loadConsultants();
    });

    // Load consultants initially
    loadConsultants();
});
