/**
 Usage:
 <div kato data-type="projects">
 <h2 data-field="title"></h2>
 <p data-field="description"></p>
 </div>
 **/

if (typeof jQuery == 'undefined') {
    console.log('Please load jQuery');
} else {
    $('[kato]').each(function () {
        var dataObject = $(this).data();
        for (var prop in dataObject) {
            //console.log(prop);
            if (prop === 'type') {
                var parent = this;
                var type = $(this).data('type');
                var childrenHtml = $(this).children();
                $(parent).html('');//empty the container
                $.get('http://localhost:9000/entries/' + type, function (result) {
                    console.log(result);

                    if (result.length !== 0) {
                        result.forEach(function (item) {
                            //console.log(item);
                            for (var i = 0; i < childrenHtml.length; i++) {
                                var childData = $(childrenHtml[i]).data();
                                //console.log(item.data);
                                var childItem = $(childrenHtml[i]).html(item.data[childData.field]);
                                console.log(childItem);
                                $(parent).append(childItem);
                            }
                            ;
                        });
                    }
                });
            }
        }
    });
}
