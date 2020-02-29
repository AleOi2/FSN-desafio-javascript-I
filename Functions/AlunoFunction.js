const { media } = require('../utils/utils');
let AttAlunos = ['id', 'nome', 'faltas', 'notas', 'cursos'];
let TypeAttAlunos = ['primary_key', 'string', 'int','array', 'array'];

// implementação
const adicionarAluno = (nome, ListaDeAlunos) =>{  
    /*Essa função irá receber uma *string* que é nome do aluno a ser criado. 
    E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
    A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/    
    let newStudent = {};
    AttAlunos.forEach((element, index) =>{
        switch (TypeAttAlunos[index]) {
            case 'string':
                newStudent[element] = nome;
                break;
            case 'array':
                newStudent[element] = [];        
                break;
            case 'int':
                newStudent[element] = 0;        
                break;
            case 'object':
                newStudent[element] = {};        
                break;
            case 'primary_key':
                newStudent[element] = ListaDeAlunos.length + 1;        
                break;
            default:
                return Error('Em adicionar Aluno tipo' + element + 'de atributo não definido');
        }
    })    
    ListaDeAlunos.push(newStudent)
    console.log(`O aluno(a) ${nome} foi inserido(a) corretamente`)
    return ListaDeAlunos
}

const formataLista  = (element) =>{
    let str = ''
    let tmp = ''
    for(let charac in element){
        switch (charac) {
            case 'nome':
                str += `Sou ${element[charac]} \n`
                break;
            case 'notas':
                str += `Minhas notas são: ${(element[charac].length === 0)?'Não tenho notas':element[charac]} \n`
            break;
            case 'cursos':
                //printObj()
                for(let curso of element[charac]){
                    tmp += curso.nomeDoCurso + ' '
                }
                str += `Estou cursando: ${(element[charac].length === 0 )?'Não tenho curso':tmp} \n`            
            break;
            case 'faltas':
                str += `Atualmente tenho ${element[charac]} faltas \n`
            break;
            case 'id':
            break;
            default:
                console.log(`Propriedade ${charac} não registrada \n`)
                break;
        }
    }
    console.log(str)
}
   
const listarAlunos = (ListaDeAlunos) => {
    /*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
    Vale dizer que As informações deverão ser exibidas em um formato amigável.*/
    Object.values(ListaDeAlunos).forEach((element) => {
        formataLista(element)
    }); 
}

const buscarAluno = (nome, ListaDeAlunos) => {
    /* Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
    Ela deverá exibir um feedback, tanto para quando encontrar o aluno, 
    tanto quando não encontrar. E deverá devolver um aluno em seu retorno. */
    let aluno = ListaDeAlunos.filter((element) =>{
        return element.nome === nome;
    });
    (aluno.length === 0)?console.log('Aluno não encontrado'):null;
    return aluno;
}

const matricularAluno = (aluno, curso, ListaDeAlunos) =>{
    /* 
    aluno:object, curso:string
    Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
    Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, e deverá armazenar a data atual no momento da matricula
    Lembre-se de exibir o feedback para o usuário. */
    isStudent(aluno, 'Em matricular aluno, Aluno contêm atributos inválidos ');
    aluno['id'] = ListaDeAlunos.length + 1;
    aluno.cursos.push(curso);
    ListaDeAlunos.push(aluno);
    console.log(`O aluno(a) ${aluno.nome} foi inserido(a) corretamente no curso de ${curso}`)
    return ListaDeAlunos;
}

const isRegistered = (aluno) =>{
    return (aluno.cursos.length === 0)?false:true;
}

const isStudent = (aluno, Msg) =>{
    let err = []; let len;
    // Pode ter id ou não
    (aluno.id)?len = AttAlunos.length:len = AttAlunos.length - 1;
    if(Object.keys(aluno).length === len)
    {
        for(let attribute in aluno){
            if(!AttAlunos.find((element) => (element === attribute))){
                err.push(attribute);
         }
        }
         if(err.length > 0) throw Error(Msg + err);
    }else{        
        throw Error('A quantidade de atributos de entrada não coincide com AttAlunos')
    }

}

const aplicarFalta = (alunoProcurado, ListaDeAlunos) =>{
    /*
    aluno:object
     Ao receber um aluno devidamente cadastrado em nossa lista. Você deverá incrementar uma falta ao aluno. 
     Você deverá dar um feedback ao concluir a tarefa. Só poderá aplicar falta em aluno se o mesmo tiver 
     matriculado em um curso.
    */
    isStudent(alunoProcurado, 'Aluno contêm atributos inválidos ');
    if(!alunoProcurado.id) throw Error('aplicar falta necessita de id');
     if(isRegistered(ListaDeAlunos[alunoProcurado.id - 1])){
        ListaDeAlunos[alunoProcurado.id - 1].faltas += 1; 
     }else{console.log('O aluno não está registrado')}
    return ListaDeAlunos;
}
    

const aplicarNota = (alunoProcurado, ListaDeAlunos) =>{
    /*
    aluno:object
     Ao receber um aluno devidamente cadastrado em nossa lista. 
     Você deverá adicionar uma nota ao aluno na sua lista de notas. V
     ocê deverá dar um feedback ao concluir a tarefa. 
     Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
    */
   isStudent(alunoProcurado, 'Aluno contêm atributos inválidos ');
   if(!alunoProcurado.id) throw Error('aplicar nota necessita de id');
    if(isRegistered(ListaDeAlunos[alunoProcurado.id - 1])){
        if(Array.isArray(alunoProcurado.notas)){
            ListaDeAlunos[alunoProcurado.id - 1].notas = 
                [...ListaDeAlunos[alunoProcurado.id - 1].notas,...alunoProcurado.notas]; 
        }else{
            ListaDeAlunos[alunoProcurado.id - 1].notas.push(alunoProcurado.notas); 
        }
    }else{console.log('O aluno não está registrado')}
   return ListaDeAlunos;
}


const aprovarAluno = (alunoProcurado, ListaDeAlunos) =>{
     /* 
     aluno:object
     Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não.
      Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
     Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
     */
    isStudent(alunoProcurado, 'Aluno contêm atributos inválidos ');
    if(!alunoProcurado.id) throw Error('aprovar aluno necessita de id');
     if(isRegistered(ListaDeAlunos[alunoProcurado.id - 1])){
         if(media(ListaDeAlunos[alunoProcurado.id - 1].notas) > 7 && 
           ListaDeAlunos[alunoProcurado.id - 1].faltas <= 3){
               console.log('O aluno ' + ListaDeAlunos[alunoProcurado.id - 1].nome + ' foi aprovado')           
         }else if(media(ListaDeAlunos[alunoProcurado.id - 1].notas) < 7 && 
            ListaDeAlunos[alunoProcurado.id - 1].faltas <= 3){            
                console.log('O aluno ' + ListaDeAlunos[alunoProcurado.id - 1].nome + ' foi reprovado por nota')           
        }else if(media(ListaDeAlunos[alunoProcurado.id - 1].notas) > 7 && 
            ListaDeAlunos[alunoProcurado.id - 1].faltas > 3){            
                console.log('O aluno ' + ListaDeAlunos[alunoProcurado.id - 1].nome + ' foi reprovado por frequência')           
        }else if(media(ListaDeAlunos[alunoProcurado.id - 1].notas) < 7 && 
            ListaDeAlunos[alunoProcurado.id - 1].faltas <= 3){            
                console.log('O aluno ' + ListaDeAlunos[alunoProcurado.id - 1].nome + ' foi reprovado por nota e por frequência')  
        }   
     }else{console.log('O aluno não está registrado')}
    return ListaDeAlunos;
}

module.exports = {
    adicionarAluno,
    listarAlunos,
    buscarAluno,
    matricularAluno,
    aplicarFalta,
    aplicarNota,
    aprovarAluno
}