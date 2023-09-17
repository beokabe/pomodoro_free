(function () {
    function Paginacao(page, totalItens, totalPages) {
        this.page = page
        this.totalPages = totalPages
        this.totalItens = totalItens
    }

    function Task(title, description) {
        this.title = title
        this.description = description
        this.productiveHours = 0
    }

    let tasks = []
    let paginacao = new Paginacao(1, tasks.length, 1)
    
    document.getElementById("delegate-task").addEventListener("click", () => {
        alert("Available only in framework version!")
    })

    function init() {

    }

    window.addEventListener("load", init())
})()