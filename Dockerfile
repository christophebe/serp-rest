FROM mcr.microsoft.com/playwright:focal
WORKDIR /app
COPY . .
RUN npm install
RUN npx playwright install  
EXPOSE 3000
ENTRYPOINT ["node", "index.js"]
