create table credencial
(
    id_credencial uuid default gen_random_uuid() not null
        constraint credencial_pk
            primary key,
    password      varchar(250),
    hash          varchar(50)
);

alter table credencial
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on credencial to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on credencial to matias;

grant delete, insert, references, select, trigger, truncate, update on credencial to miguel;

create table categoria
(
    id_categoria uuid default gen_random_uuid() not null
        constraint categoria_pk
            primary key,
    nombre       varchar(50)                    not null,
    ruta_imagen  varchar(100),
    descripcion  varchar(500),
    tipo         varchar(50)                    not null
);

alter table categoria
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on categoria to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on categoria to matias;

grant delete, insert, references, select, trigger, truncate, update on categoria to miguel;

create table producto
(
    id_producto    uuid default gen_random_uuid() not null
        constraint producto_pk
            primary key,
    id_categoria   uuid
        constraint fk_producto_categoria_id
            references categoria,
    nombre         varchar(50)                    not null
        unique,
    ingredientes   character varying[],
    retiro_local   boolean                        not null,
    limitado       boolean                        not null,
    stock          integer                        not null,
    porcion        varchar(50)                    not null,
    ruta_imagen    varchar(100),
    valor_unitario integer                        not null
);

alter table producto
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on producto to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on producto to matias;

grant delete, insert, references, select, trigger, truncate, update on producto to miguel;

create table direccion
(
    id_direccion uuid default gen_random_uuid() not null
        constraint direccion_pk
            primary key,
    numero_casa  integer,
    calle        varchar(125),
    poblacion    varchar(125),
    descripcion  varchar(255),
    sector       varchar(125)
);

alter table direccion
    owner to postgres;

create table usuario
(
    id_usuario   uuid default gen_random_uuid() not null
        constraint usuario_pk
            primary key,
    rut          varchar(8)
        unique,
    nombre       varchar(180),
    apellido_p   varchar(100),
    apellido_m   varchar(100),
    correo       varchar(60)                    not null
        unique,
    id_direccion uuid
        constraint fk_usuario_direccion
            references direccion,
    num_telefono varchar(12)
);

alter table usuario
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on usuario to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on usuario to felipe;

grant delete, insert, references, select, trigger, truncate, update on usuario to matias;

grant delete, insert, references, select, trigger, truncate, update on usuario to miguel;

grant delete, insert, references, select, trigger, truncate, update on direccion to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on direccion to matias;

grant delete, insert, references, select, trigger, truncate, update on direccion to miguel;

create table estado
(
    id_estado     uuid default gen_random_uuid() not null
        constraint estado_pk
            primary key,
    estado_pedido varchar(50)
);

alter table estado
    owner to luis;

create table carrito
(
    id_carrito     uuid default gen_random_uuid() not null
        constraint carrito_pk
            primary key,
    id_cliente     uuid
        constraint fk_carrito_cliente_id
            references usuario,
    fecha_creacion timestamp,
    id_estado      uuid
        constraint fk_carrito_estado
            references estado,
    precio_total   integer
);

alter table carrito
    owner to luis;

grant select on carrito to matias;

grant select on carrito to miguel;

create table detalle_carrito
(
    id_detalle_carrito uuid default gen_random_uuid() not null
        constraint detalle_carrito_pk
            primary key,
    id_carrito         uuid
        constraint fk_detalle_carrito_carrito_id
            references carrito,
    id_producto        uuid
        constraint fk_detalle_carrito_producto_id
            references producto,
    cantidad           integer,
    mensaje            text,
    precio_unitario    integer
);

alter table detalle_carrito
    owner to luis;

grant select on detalle_carrito to matias;

grant select on detalle_carrito to miguel;

grant select on estado to matias;

grant select on estado to miguel;

create table rol
(
    id_rol uuid default gen_random_uuid() not null
        constraint rol_pk
            primary key,
    rol    varchar
);

alter table rol
    owner to postgres;

create table cuenta
(
    id_cuenta        uuid default gen_random_uuid() not null
        constraint cuenta_pk
            primary key,
    id_cliente       uuid
        constraint fk_cuenta_id
            references usuario,
    id_rol           uuid
        constraint fk_cuenta_rol
            references rol,
    estado_actividad varchar(50),
    nombre_usuario   varchar(120),
    id_credencial    uuid
        constraint fk_cuenta_credencial_id
            references credencial
);

alter table cuenta
    owner to postgres;

grant delete, insert, references, select, trigger, truncate, update on cuenta to m_marchant;

grant delete, insert, references, select, trigger, truncate, update on cuenta to matias;

grant delete, insert, references, select, trigger, truncate, update on cuenta to miguel;

grant delete, insert, references, select, trigger, truncate, update on rol to matias;

grant select on rol to miguel;

create table boleta
(
    id_boleta      uuid default gen_random_uuid() not null
        constraint boleta_pk
            primary key,
    id_carrito     uuid
        constraint fk_boleta_carrito_id
            references carrito
            on delete set null,
    id_usuario     uuid
        constraint fk_boleta_cuenta_id
            references usuario,
    nombre_usuario varchar,
    fecha_emision  timestamp,
    precio_total   integer,
    id_direccion   uuid
);

alter table boleta
    owner to luis;

grant select on boleta to matias;

grant select on boleta to miguel;

create table detalle_boleta
(
    id_detalle_boleta uuid    default gen_random_uuid() not null
        constraint detalle_boleta_pk
            primary key,
    id_boleta         uuid
        constraint fk_detalle_boleta_boleta_id
            references boleta,
    id_producto       uuid
        constraint fk_detalle_boleta_producto_id
            references producto,
    cantidad          integer,
    precio_unitario   integer,
    mensaje           text,
    estado            varchar default 'Pendiente'::character varying
);

alter table detalle_boleta
    owner to luis;

grant select on detalle_boleta to matias;

grant select on detalle_boleta to miguel;

