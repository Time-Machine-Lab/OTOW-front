# 使用 Node.js 镜像作为基础镜像
FROM node:18 as build-stage

# 设置工作目录
WORKDIR /app

# 将项目文件复制到工作目录
COPY . .

# 使用 Nginx 镜像作为基础镜像
FROM nginx:stable-alpine as production-stage

# 将构建结果复制到 Nginx 服务器
COPY --from=build-stage /app/dist /usr/share/nginx/html
# 创建 SSL 证书存储目录
# RUN mkdir -p /etc/nginx/ssl

# 将 SSL 证书和私钥复制到 Nginx 容器内的专门目录
# COPY dist/lisianthus.cn_bundle.crt /etc/nginx/ssl/lisianthus.cn_bundle.pem
# COPY dist/lisianthus.cn.key /etc/nginx/ssl/lisianthus.cn.key
# RUN ls -l /etc/nginx/ssl/lisianthus.cn.key || exit 1
# 暴露端口 80
EXPOSE 8080

# 添加默认的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 启动 Nginx 服务器
CMD ["nginx", "-g", "daemon off;"]
