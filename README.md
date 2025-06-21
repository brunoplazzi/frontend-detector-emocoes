# Detector de Emoções Faciais (Frontend React)

## Descrição do Projeto

Este é o frontend de um aplicativo web para detecção de emoções faciais, construído com React. Ele oferece duas formas de entrada para o usuário:

- Tirar uma foto usando a webcam;
- Enviar uma imagem da galeria (upload de arquivo).

O frontend captura a imagem, converte para base64 e envia para um backend (não incluso aqui) que realiza a análise de emoção utilizando modelos como MediaPipe e DeepFace. O resultado da emoção detectada é exibido ao usuário.

---

## Tecnologias Utilizadas

- React (com React Router para navegação)
- TypeScript
- react-webcam (para captura de imagem via webcam)
- Fetch API para comunicação com backend

---

## Estrutura do Projeto

```
src/
│
├── components/               # Componentes reutilizáveis
│   ├── CameraCapture.tsx     # Captura de imagem via webcam
│   ├── EmotionResult.tsx     # Exibe o resultado da emoção detectada
│   └── ImageUpload.tsx       # Upload de imagem da galeria
│
├── pages/                    # Páginas do app (rotas)
│   ├── Home.tsx              # Tela inicial de escolha entre webcam ou upload
│   ├── WebcamPage.tsx        # Página com componente webcam
│   └── UploadPage.tsx        # Página com componente upload
│
├── App.tsx                   # Configuração das rotas
├── main.tsx                  # Ponto de entrada do ReactDOM com BrowserRouter
└── index.css                 # Estilos globais (Tailwind)
```

---

## Como Rodar o Projeto

### Pré-requisitos

- Node.js (versão 16+ recomendada)
- npm ou yarn instalado

### Passos

1. Clone o repositório

```bash
git clone https://github.com/seuusuario/detector-emocoes.git
cd detector-emocoes
```

2. Instale as dependências

```bash
npm install
# ou
yarn install
```

3. No emotionService.ts, altere para o endereço do seu endpoint

4. Execute o projeto

```bash
npm run dev
# ou
yarn dev
```

5. Abra o navegador em

```
http://localhost:5173
```

---

## Como Funciona o Fluxo do Aplicativo

1. O usuário chega na **tela inicial (Home)** e escolhe entre usar a webcam ou enviar uma imagem da galeria.
2. De acordo com a escolha, é redirecionado para a página correspondente.
3. Na página da webcam, o usuário pode tirar uma foto que é capturada, convertida em base64 e enviada ao backend.
4. Na página de upload, o usuário seleciona uma imagem do computador, que é convertida em base64 e enviada ao backend.
5. O backend retorna a emoção detectada.
6. O resultado é exibido na tela com uma mensagem amigável.
7. O usuário pode voltar à tela inicial para realizar uma nova análise.

---

## Possíveis Melhorias Futuras

- Mostrar uma prévia da imagem capturada/enviada.
- Exibir múltiplas emoções com porcentagens.
- Adicionar loading animado enquanto espera a resposta do backend.
- Suporte a vídeos ou múltiplas capturas.
- Internacionalização para múltiplos idiomas.
- Testes automatizados para componentes e integração.
- Melhorar a responsividade e acessibilidade.
- Salvar histórico de análises localmente.

---