# Étape 1 : builder l'app
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Étape 2 : image finale (serveur web léger)
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copie les fichiers Vite compilés
COPY --from=builder /app/dist .

# Supprime la config par défaut et ajoute celle de Vite
COPY --from=builder /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
