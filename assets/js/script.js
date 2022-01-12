/* Abrir modal */
document.querySelector('.logar a').addEventListener('click', (e)=>{
    e.preventDefault();

    document.querySelector('.formulario').style.opacity = 0;
    document.querySelector('.formulario').style.display = 'flex';
    setTimeout(()=>{
        document.querySelector('.formulario').style.opacity = 1;
    }, 200);
});
document.querySelector('.fechar').addEventListener('click', (e)=>{
    document.querySelector('.formulario').style.opacity = 1;
    document.querySelector('.formulario').style.display = 'none';
    setTimeout(()=>{
        document.querySelector('.formulario').style.opacity = 0;
    }, 200);
});

/* Validação */
let validador = {
    handleSubmit: (event)=>{
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll('input');

        validador.clearErrors();

        for(let i=0;i<inputs.length;i++){
            let input = inputs[i];
            let check = validador.checkInput(input);
            if(check !== true) {
                send = false;
                validador.showError(input, check); 
            }
        }

        if(send) {
            form.submit();
        }
    },
    checkInput:(input)=>{
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                let detalhesDaRegra = rules[k].split('=');
                switch(detalhesDaRegra[0]) {
                    case 'required':
                        if(input.value == ''){
                            return 'Campo de preenchimento obrigatório.';
                        }
                    break;
                    case 'min':
                        if(input.value.length < detalhesDaRegra[1]) {
                            return 'Necessário pelo menos '+detalhesDaRegra[1]+' caracteres.';
                        }
                    break;
                    case 'email':
                        if(input.value !== '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if(!regex.test(input.value.toLowerCase())) {
                                return 'Email digitado não é válido.'
                            }
                        }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error)=>{
        input.style.borderColor = '#f00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: ()=> {
        let inputs = form.querySelectorAll('input');
        for(let i=0;i<inputs.length;i++){
           inputs[i].style = ''; 
        }

        let errorElements = document.querySelectorAll('.error');
        for(let i=0;i<errorElements.length;i++){
            errorElements[i].remove();
        }
    }
};

let form = document.querySelector('.validador');
form.addEventListener('submit', validador.handleSubmit);


  