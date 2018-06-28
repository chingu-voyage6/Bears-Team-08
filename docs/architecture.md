# Server

## Authentication

- jwt authentication
- github account linking would be nice

## Document

The Document object the parts needed to recreate the drawing as well as keeping
a history of undos.

## Synchronization

- for now a simple lock will suffice (this is low value but would be
  ridiculously awesome)

# Client

- must be logged in to fork or edit a document (a picture)

## State management

Redux

### Actions

Api based actions:

- LoadDrawing
- SaveDrawing
- AddPaint
