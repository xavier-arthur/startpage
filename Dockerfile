FROM node:16
WORKDIR /app

COPY . .

EXPOSE 5858

RUN ["npm", "install"]
CMD ["npm", "start"]