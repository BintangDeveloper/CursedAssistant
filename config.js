/*
 * Made by @BintangDeveloper.
 *
 * Copyright all rights reserved.
*/

const ClientID = process.env.CLIENTID;
const Token = process.env.TOKEN;

const OWNER = '1101044683993522206';

const Access = {
    users: [
    '1101044683993522206'
    ],
    servers: [
    '1114130686580903937',
    '1123578397906436096'
    ]
};

module.exports = {
    ClientID: ClientID,
    Token: Token,
    Access: Access,
};