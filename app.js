$(document).ready(function() {
    $('#load-btn').click(function() {
        $.get('http://localhost:3000/consultants', function(data) {
            $('#consultant-list').empty(); // Clear the list before appending
            data.forEach(consultant => {
                $('#consultant-list').append(`
                    <li class="list-group-item">
                        ${consultant.firstName} ${consultant.lastName} (CIN: ${consultant.CIN})
                    </li>
                `);
            });
        }).fail(function() {
            alert('Error loading consultants.');
        });
    });
});
