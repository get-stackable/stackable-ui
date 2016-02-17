if (typeof jQuery == 'undefined') {
    console.log('Please load jQuery');
} else {
  $( document ).ready(function() {
    $.get('http://localhost:9000/entries/MrNzZGqJdcNCAjFns', function( result ) {
      console.log(result);
      $('[kato]').each(function() {
          var dataObject = $(this).data();
          for (var prop in dataObject) {
            $(this).html(result.data[prop]);
          }
      });
    });
  });
}
