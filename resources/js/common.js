import axios from "axios"

export default {
    data() {
        return {

        }
    },
    methods: {

        /** METODO UNICO PARA REALIZAR PETICIONES **/

        async callApi(method, url, dataObj) {
            try {
                return axios({
                    method: method,
                    url: url,
                    data: dataObj
                })
            } catch (e) {
                console.log(e)
                return e.response
            }
        },

        /** MENSAJES DE ALERTAS POR EVENTOS **/
        i(desc, title = "Hey") {
            this.$Notice.info({
                title: title,
                desc: desc
            })
        },
        c(desc, title = "Great") {
            this.$Notice.success({
                title: title,
                desc: desc
            });
        },
        warning(desc, title = "Oops") {
            this.$Notice.warning({
                title: title,
                desc: desc
            })
        },
        error(desc, title = "Hey") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        },
        swr(desc = "Somethingn went wrong! Please try again.", title = "Oops") {
            this.$Notice.error({
                title: title,
                desc: desc
            });
        }
    }
}
