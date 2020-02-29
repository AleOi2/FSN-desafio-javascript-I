let { alunosDaEscola } = require('./InputFile');
const {
    adicionarAluno,
    listarAlunos,
    buscarAluno,
    matricularAluno,
    aplicarFalta,
    aplicarNota,
    aprovarAluno
}  = require('./Functions/AlunoFunction');
const { addId } = require('./utils/utils');

function main(){
    try{
        alunosDaEscola = addId(alunosDaEscola);
        let novoAluno = adicionarAluno('Guilherme', alunosDaEscola);
        let alunoBuscado = buscarAluno('Henrique', novoAluno);
        let novaMatricula = matricularAluno({
            nome: 'Letícia',
            notas:[10, 4, 3, 5],
            cursos:['Java', 'Matlab'],
            faltas:3
        }, 'Javascript', novoAluno)
        let aplicandoFalta = aplicarFalta({
            id:4, 
            nome:'Guilherme',
            notas:[10,9.8,9.6],
            cursos:[{nomeDoCurso:'Full Stack',dataMatricula:new Date}],
            faltas:0
        }, novaMatricula)
        let aplicandoNota = aplicarNota({
            id:4, 
            nome:'Guilherme',
            notas:10,
            cursos:[{nomeDoCurso:'Full Stack',dataMatricula:new Date}],
            faltas:0
        }, aplicandoFalta)
        listarAlunos(novoAluno)

        aprovarAluno({
            id:6,
            nome:"Henrique",
            notas:[10, 2, 3.2],
            cursos:[{nomeDoCurso:'JS',dataMatricula:new Date}],
            faltas:1
        }, aplicandoNota)

    }catch(err){
        console.log(err);

    }

}


main();

