<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <button @click="initAddTask()" class="btn btn-primary btn-xs pull-right">
                            + Adicionar Nova Tarefa
                        </button>
                        Minhas tarefas
                    </div>

                    <div class="panel-body">

                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" role="dialog" id="add_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">&nbsp Adicionar Nova Tarefa</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="name">Nome:</label>
                            <input type="text" name="name" id="name" placeholder="Task Name" class="form-control"
                                   v-model="task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição:</label>
                            <textarea name="description" id="description" cols="30" rows="5" class="form-control"
                                      placeholder="Task Description" v-model="task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="completed">Finalizada: &nbsp&nbsp&nbsp</label>
                            <Input type="checkbox" name="description" id="completed" cols="30" rows="5" v-model="task.completed">Completed</input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button type="button" @click="createTask" class="btn btn-primary">Submeter</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

    </div>
</template>

<script>
    export default {
        data(){
            return {
                task: {
                    name: '',
                    description: '',
                    completed: ''
                },
                errors: []
            }
        },
        methods: {
            initAddTask()
            {
                this.errors = [];
                $("#add_task_model").modal("show");
            },
            createTask()
            {
                axios.post('/task', {
                    name: this.task.name,
                    description: this.task.description,
                    completed: this.task.completed
                })
                    .then(response => {

                        this.reset();

                        $("#add_task_model").modal("hide");

                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.errors.name) {
                            this.errors.push(error.response.data.errors.name[0]);
                        }

                        if (error.response.data.errors.description) {
                            this.errors.push(error.response.data.errors.description[0]);
                        }
                    });
            },
            reset()
            {
                this.task.name = '';
                this.task.description = '';
                this.task.completed = '';
            },
        }
    }
</script>