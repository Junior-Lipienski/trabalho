# Usa a imagem base oficial do Node.js
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copia os arquivos do projeto para dentro do container
COPY package*.json ./
COPY server.js ./

# Instala as dependências
RUN npm install express prom-client

# Expõe a porta usada pela aplicação
EXPOSE 3000

# Define o comando que será executado ao iniciar o container
CMD ["node", "server.js"]
