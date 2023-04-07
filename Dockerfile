FROM node:18.15.0
ARG USER=presentationbridge
ARG GROUP=presentationbridge
ARG UID=1001
ARG GID=1001
ARG BASEDIR="/presentationbridge"
RUN groupadd -g "${GID}" "${USER}" && \
    useradd --no-log-init -u "${UID}" -g "${GID}" "${USER}"
COPY --chown="${USER}:${GROUP}" . "${BASEDIR}"
RUN cd "${BASEDIR}" && \
    npm install
USER "${USER}"
WORKDIR "${BASEDIR}"
CMD ["node", "main.js", "8080"]