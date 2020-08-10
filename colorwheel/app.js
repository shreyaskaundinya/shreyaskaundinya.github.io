var app = new Vue({
    el: '.container-main',
    data: {
        key: '',
        color_scheme: [],
        height: '90vh',
        True: true,
        codes: '',
        r: null,
    },

    methods: {
        refreshcodes: function () {
            var codes = this.color_scheme.map(function (i) {
                return { name: i.name, hex: i.hex, rgb: 'rgb(' + i.rgb + ')' };
            });
            this.codes = JSON.stringify(codes);
        },
        ccc: function (rgb) {
            // returns the text color for the color codes depending on the sum of the rgb values of the color
            // ccc - color_codes_color
            var rgb_list = eval(rgb.split(','));

            var sum = 0;
            for (i = 0; i <= rgb_list.length - 1; i++) {
                sum += parseInt(rgb_list[i]);
            }
            if (sum >= 400) {
                return 'black';
            } else {
                return 'white';
            }
        },
        lock: function (id) {
            // locks the specified color so it cant be changed
            this.color_scheme[id].locked = !this.color_scheme[id].locked;
            var span = document.getElementById(String(id) + 'span');
            if (span.classList.contains('fa-unlock')) {
                span.classList.add('fa-lock');
                span.classList.remove('fa-unlock');
            } else {
                span.classList.remove('fa-lock');
                span.classList.add('fa-unlock');
            }
        },
        hexToRgb: function (hex) {
            // returns rgb values for given hex code of color
            var bigint = parseInt(hex, 16);
            var r = (bigint >> 16) & 255;
            var g = (bigint >> 8) & 255;
            var b = bigint & 255;

            return r + ',' + g + ',' + b;
        },
        color_name: async function (k) {
            var api_query =
                'https://www.thecolorapi.com/id?rgb=' +
                this.color_scheme[k].rgb;
            await axios.get(api_query).then((response) => {
                this.color_scheme[k].name = response.data.name.value;
            });
            app.$forceUpdate();
        },
        add: function () {
            // adds new color to the color scheme
            var index = Object.keys(this.color_scheme).length;
            this.color_scheme.push(Object());
            this.color_scheme[index].name = '';
            this.color_scheme[index].hex = '';
            this.color_scheme[index].rgb = '';
            this.color_scheme[index].locked = false;
            this.color_scheme[index].color_codes_color = 'black';
            this.random();
        },
        random: function () {
            // random color generator
            const oct = [
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
            ];

            /*Color Generator*/

            this.key = '';
            for (k = 0; k <= this.color_scheme.length - 1; k++) {
                if (this.color_scheme[k].locked === false) {
                    this.color_scheme[k].hex = '#';
                    for (i = 1; i <= 6; i++) {
                        var random = Math.floor(Math.random() * oct.length);
                        this.color_scheme[k].hex =
                            this.color_scheme[k].hex + oct[random];
                    }
                    this.color_scheme[k].rgb = this.hexToRgb(
                        this.color_scheme[k].hex.slice(
                            1,
                            this.color_scheme[k].hex.length
                        )
                    );
                    this.color_scheme[k].color_codes_color = this.ccc(
                        this.color_scheme[k].rgb
                    );
                    //Color Api Call
                    // NEED TO FIX THE API CALL
                    this.color_name(k);
                }
            }

            // updated the key to change the value if generate is clicked
            this.height =
                String(Math.floor(100 / this.color_scheme.length)) + 'vh';
            $('.container').css('height', this.height);
            this.key = 'changed';
        },
        copy_codes: function () {
            this.refreshcodes();
            var input = document.createElement('input');
            input.value = this.codes;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
        },
    },
    computed: {},
});
