<template>
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <button @click="initAddTask()" class="btn btn-primary btn-xs pull-right">
                             + Nova Tarefa
                        </button>
                        Minhas tarefas
                    </div>

                    <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
                            <caption>Completas</caption>
                            <tbody>
                            <tr>
                                <th>
                                    Num.
                                </th>
                                <th>
                                    Nome
                                </th>
                                <th>
                                    Descrição
                                </th>
                                <th>
                                    Acção
                                </th>
                            </tr>
                            <tr v-for="(task, index) in tasks"> <!--where completed=1-->
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ task.name }}
                                </td>
                                <td>
                                    {{ task.description }}
                                </td>
                                <td>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button @click="deleteTask(index)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--                     <div class="panel-body">
                        <table class="table table-bordered table-striped table-responsive" v-if="tasks.length > 0">
                            <caption>Por completar</caption>
                            <tbody>
                            <tr>
                                <th>
                                    Num.
                                </th>
                                <th>
                                    Nome
                                </th>
                                <th>
                                    Descrição
                                </th>
                                <th>
                                    Acção
                                </th>
                            </tr>
                            <tr v-for="(task, index) in tasks">
                                <td>{{ index + 1 }}</td>
                                <td>
                                    {{ task.name }}
                                </td>
                                <td>
                                    {{ task.description }}
                                </td>
                                <td>
                                    <button @click="initUpdate(index)" class="btn btn-success btn-xs">Edit</button>
                                    <button @click="deleteTask(index)" class="btn btn-danger btn-xs">Delete</button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div> -->
                </div>
            </div>
        </div>

        <div class="modal fade" tabindex="-1" role="dialog" id="add_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Nova Tarefa</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label for="name">Nome:</label>
                            <input type="text" name="name" id="name" placeholder="Nome da tarefa" class="form-control"
                                   v-model="task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição:</label>
                            <textarea name="description" id="description" cols="30" rows="5" class="form-control"
                                      placeholder="Descrição da tarefa" v-model="task.description"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="checked">Finalizada: &nbsp&nbsp&nbsp</label>
                            <Input type="checkbox" name="description" id="checkbox" v-model="task.checked">Completa</input>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Fechar</button>
                        <button type="button" v-on:click="createTask()" class="btn btn-primary">Submeter</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->

        <div class="modal fade" tabindex="-1" role="dialog" id="update_task_model">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                        <h4 class="modal-title">Actualizar Tarefa</h4>
                    </div>
                    <div class="modal-body">

                        <div class="alert alert-danger" v-if="errors.length > 0">
                            <ul>
                                <li v-for="error in errors">{{ error }}</li>
                            </ul>
                        </div>

                        <div class="form-group">
                            <label>Nome:</label>
                            <input type="text" placeholder="Nome da tarefa" class="form-control"
                                   v-model="update_task.name">
                        </div>
                        <div class="form-group">
                            <label for="description">Descrição:</label>
                            <textarea cols="30" rows="5" class="form-control"
                                      placeholder="Descrição da tarefa" v-model="update_task.description"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="checked">Finalizada: &nbsp&nbsp&nbsp</label>
                            <Input type="checkbox" name="description" id="completed" cols="30" rows="5" v-model="task.checked">Completa</input>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>
                        <button type="button" v-on:click="updateTask" class="btn btn-primary">Submeter</button>
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
                    checked: ''
                },
                errors: [],
                tasks: [],
                update_task: {}
            }
        },
        mounted()
        {
            this.readTasks();
        },
        methods: {
            initAddTask()
            {
                $("#add_task_model").modal("show");
            },
            createTask()
            {
                axios.post('/task', {
                    name: this.task.name,
                    description: this.task.description,
                    complete: this.task.checked,
                })
                    .then(response => {

                        this.reset();

                        this.tasks.push(response.data.task);

                        $("#add_task_model").modal("hide");

                    })
                    .catch(error => {

                    });
            },
            reset()
            {
                this.task.name = '';
                this.task.description = '';
                this.taks.checked = '';
            },
            readTasks()
            {
                axios.get('/task')
                    .then(response => {

                        this.tasks = response.data.tasks;

                    });
            },
            initUpdate(index)
            {
                this.errors = [];
                $("#update_task_model").modal("show");
                this.update_task = this.tasks[index];
            },


            updateTask()
            {
                axios.patch('/task/' + this.update_task.id, {
                    name: this.update_task.name,
                    description: this.update_task.description,
                })
                    .then(response => {

                        $("#update_task_model").modal("hide");

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

            deleteTask(index)
            {
                let conf = confirm("Do you ready want to delete this task?");
                if (conf === true) {

                    axios.delete('/task/' + this.tasks[index].id)
                        .then(response => {

                            this.tasks.splice(index, 1);

                        })
                        .catch(error => {

                        });
                }
            }
        }
    }
</script>