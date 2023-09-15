// GENERATED CODE -- DO NOT EDIT!

'use strict';
import { makeGenericClientConstructor } from 'grpc';
import { AppendReply, AppendRequest, DeleteReply, DeleteRequest, StoreReply, StoreRequest } from './computeandstorage_pb.js';

function serialize_computeandstorage_AppendReply(arg) {
  if (!(arg instanceof AppendReply)) {
    throw new Error('Expected argument of type computeandstorage.AppendReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_AppendReply(buffer_arg) {
  return AppendReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_computeandstorage_AppendRequest(arg) {
  if (!(arg instanceof AppendRequest)) {
    throw new Error('Expected argument of type computeandstorage.AppendRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_AppendRequest(buffer_arg) {
  return AppendRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_computeandstorage_DeleteReply(arg) {
  if (!(arg instanceof DeleteReply)) {
    throw new Error('Expected argument of type computeandstorage.DeleteReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_DeleteReply(buffer_arg) {
  return DeleteReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_computeandstorage_DeleteRequest(arg) {
  if (!(arg instanceof DeleteRequest)) {
    throw new Error('Expected argument of type computeandstorage.DeleteRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_DeleteRequest(buffer_arg) {
  return DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_computeandstorage_StoreReply(arg) {
  if (!(arg instanceof StoreReply)) {
    throw new Error('Expected argument of type computeandstorage.StoreReply');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_StoreReply(buffer_arg) {
  return StoreReply.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_computeandstorage_StoreRequest(arg) {
  if (!(arg instanceof StoreRequest)) {
    throw new Error('Expected argument of type computeandstorage.StoreRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_computeandstorage_StoreRequest(buffer_arg) {
  return StoreRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var EC2OperationsService = exports.EC2OperationsService = {
  storeData: {
    path: '/computeandstorage.EC2Operations/StoreData',
    requestStream: false,
    responseStream: false,
    requestType: StoreRequest,
    responseType: StoreReply,
    requestSerialize: serialize_computeandstorage_StoreRequest,
    requestDeserialize: deserialize_computeandstorage_StoreRequest,
    responseSerialize: serialize_computeandstorage_StoreReply,
    responseDeserialize: deserialize_computeandstorage_StoreReply,
  },
  appendData: {
    path: '/computeandstorage.EC2Operations/AppendData',
    requestStream: false,
    responseStream: false,
    requestType: AppendRequest,
    responseType: AppendReply,
    requestSerialize: serialize_computeandstorage_AppendRequest,
    requestDeserialize: deserialize_computeandstorage_AppendRequest,
    responseSerialize: serialize_computeandstorage_AppendReply,
    responseDeserialize: deserialize_computeandstorage_AppendReply,
  },
  deleteFile: {
    path: '/computeandstorage.EC2Operations/DeleteFile',
    requestStream: false,
    responseStream: false,
    requestType: DeleteRequest,
    responseType: DeleteReply,
    requestSerialize: serialize_computeandstorage_DeleteRequest,
    requestDeserialize: deserialize_computeandstorage_DeleteRequest,
    responseSerialize: serialize_computeandstorage_DeleteReply,
    responseDeserialize: deserialize_computeandstorage_DeleteReply,
  },
};

export const EC2OperationsClient = makeGenericClientConstructor(EC2OperationsService);
