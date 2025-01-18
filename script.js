const enviarDadosParaSupabase = async (nome, pontos, tipo) => {
    const dados = { nome, tipo, pontos };

    try {
        // Enviando dados para o Supabase via API RESTful
        const response = await fetch('https://wrofosfnenktzukayekp.supabase.co/rest/v1/pontuacao', {
            method: 'POST',  // O método correto é POST
            headers: {
                'Content-Type': 'application/json',
                'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyb2Zvc2ZuZW5rdHp1a2F5ZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MjI0MDQsImV4cCI6MjA0ODQ5ODQwNH0.RMjHg-dPNcnv81zcajlAyG-ttbpu-ADm7xiNATKFm04',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyb2Zvc2ZuZW5rdHp1a2F5ZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MjI0MDQsImV4cCI6MjA0ODQ5ODQwNH0.RMjHg-dPNcnv81zcajlAyG-ttbpu-ADm7xiNATKFm04'
            },
            body: JSON.stringify(dados)
        });

        // Verificar se a resposta tem conteúdo
        if (!response.ok) {
            // Se a resposta não for ok, tenta capturar o erro detalhado
            const errorMessage = await response.text();
            throw new Error(`Erro ao enviar dados para o Supabase: ${errorMessage}`);
        }

        // Verificar se a resposta tem conteúdo
        const responseText = await response.text(); // Captura a resposta como texto

        if (responseText) {
            // Se a resposta não for vazia, tenta parsear como JSON
            const result = JSON.parse(responseText);
            console.log('Dados enviados com sucesso:', result);
            
            // Limpar os campos do formulário após envio bem-sucedido
            formulario.reset();
        } else {
            // Caso a resposta seja vazia
            console.log('Resposta vazia recebida');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
};

// Capturar o envio do formulário
const formulario = document.getElementById('form');
formulario.addEventListener('submit', (event) => {
    event.preventDefault();  // Evita o comportamento padrão de recarregar a página

    // Capturar os valores dos inputs
    const nome = document.getElementById('Nome').value;
    const pontos = document.getElementById('Pontos').value;
    const tipo = "Debug"; // Alterado para 'tipo'

    // Enviar os dados para o Supabase
    enviarDadosParaSupabase(nome, pontos, tipo);
});
