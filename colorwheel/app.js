var app = new Vue({
    el: ".container-main",
    data: {
        key: "",
        color_scheme: [],
        height: "100vh",
    },
    methods: {
        lock: function (id) {
            this.color_scheme[id].locked = !this.color_scheme[id].locked;
            var span = document.getElementById(String(id) + "span");
            if (span.classList.contains("fa-unlock")) {
                span.classList.add("fa-lock");
                span.classList.remove("fa-unlock");
            } else {
                span.classList.remove("fa-lock");
                span.classList.add("fa-unlock");
            }
        },
        hexToRgb: function (hex) {
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return r + "," + g + "," + b;
        },
        add: function () {
            var index = Object.keys(this.color_scheme).length;
            this.color_scheme.push(Object());
            this.color_scheme[index].hex = "";
            this.color_scheme[index].rgb = "";
            this.color_scheme[index].locked = false;

            this.random();
        },
        random: function () {
            const oct = [
                "0",
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
            ];

            /*Color Generator*/
            this.key = "";
            for (k = 0; k <= this.color_scheme.length - 1; k++) {
                if (this.color_scheme[k].locked === false) {
                    this.color_scheme[k].hex = "#";
                    for (i = 1; i <= 6; i++) {
                        var random = Math.floor(Math.random() * oct.length);
                        this.color_scheme[k].hex =
                            this.color_scheme[k].hex + oct[random];
                        this.color_scheme[k].rgb = this.hexToRgb(
                            this.color_scheme[k].hex.slice(
                                1,
                                this.color_scheme[k].hex.length
                            )
                        );
                    }
                }
            }
            // updated the key to change the value if generate is clicked
            this.height =
                String(Math.floor(100 / this.color_scheme.length)) + "vh";
            $(".container").css("height", this.height);
            this.key = "changed";
        },
    },
});
