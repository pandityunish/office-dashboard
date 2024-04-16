FROM nginx:latest

COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

WORKDIR /etc/nginx

CMD ["nginx", "-g", "daemon off;", "-p", "-e"]