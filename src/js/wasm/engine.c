#include <stdlib.h>
#include <stdio.h>
#include <emscripten.h>
#include <string.h>


int width = 0;
int height = 0;
char *current;
char *next;

EMSCRIPTEN_KEEPALIVE
char *init(int w, int h) {
    width = w;
    height = h;
    current = malloc(width * height * sizeof(char));
    next = malloc(width * height * sizeof(char));
    return current;
}

int cell_index(int i, int j) {
    i = i == -1 ? height - 1 : i == height ? 0 : i;
    j = j == -1 ? width - 1 : j == width ? 0 : j;
    return i * width + j;
}

EMSCRIPTEN_KEEPALIVE
char cell(int i, int j) {
  return current[cell_index(i, j)];
}

EMSCRIPTEN_KEEPALIVE
char cellSafe(int cellIndex) {
  return current[cellIndex];
}

EMSCRIPTEN_KEEPALIVE
char getNext(int i, int j) {
  return next[cell_index(i, j)];
}

EMSCRIPTEN_KEEPALIVE
void computeNextState () {
  int neighbors = 0;
  for (int i = 0; i < height; i++) {
    for (int j = 0; j < width; j++) {
      neighbors = cell(i - 1, j - 1) + cell(i - 1, j) + cell(i - 1, j + 1);
      neighbors += cell(i, j - 1) /* cell(i, j) */ + cell(i, j + 1);
      neighbors += cell(i + 1, j - 1) + cell(i + 1, j) + cell(i + 1, j + 1);
      if (neighbors == 3) {
        next[i * width + j] = 1;
      } else if (neighbors == 2) {
        next[i * width + j] = current[i * width + j];
      } else {
        next[i * width + j] = 0;
      }
    }
  }
  memcpy(current, next, width * height);
}

EMSCRIPTEN_KEEPALIVE
void set (int i, int j, int value) {
  printf("%d", cell_index(i, j));
  current[cell_index(i, j)] = value;
}

EMSCRIPTEN_KEEPALIVE
void setNext (int i,int j, int value) {
  next[cell_index(i, j)] = value;
}

EMSCRIPTEN_KEEPALIVE
int main() {
  EM_ASM(
    console.log("ok, run");
  );
  return 0;
}