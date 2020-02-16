$("document").ready(function () {

    (function () {
        var manufacturers = ["Aegis",
            "Bianchi",
            "BMC",
            "Cannondale",
            "Cervelo",
            "Dahon",
            "Diamondback",
            "Eddy Merckx",
            "Felt",
            "Focus",
            "Fuji",
            "Giant",
            "GT",
            "Jamis",
            "Kona",
            "Marin",
            "Merida",
            "Pinarello",
            "Raleigh",
            "Salsa",
            "Santa Cruz",
            "Scott",
            "Soma",
            "Specialized",
            "Surly",
            "Trek"
        ];

        $("#searchbox").autocomplete({
            source: manufacturers
        });

        // Overrides the default autocomplete filter function to search only from the beginning of the string
        $.ui.autocomplete.filter = function (array, term) {
            var matcher = new RegExp("^" + $.ui.autocomplete.escapeRegex(term), "i");
            return $.grep(array, function (value) {
                return matcher.test(value.label || value.value || value);
            });
        };
    })();

});