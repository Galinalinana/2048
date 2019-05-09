

// Bohan Gou,000360941. certify that this material is my original work.
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone els

function Action() {
  this.tileContainer    = document.getElementsByClassName("tile-container")[0];
 }

Action.prototype.actuate = function (board, metadata) {
  var self = this; 
  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    board.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

   });
};

 
Action.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

Action.prototype.addTile = function (tile) {
  var self = this; 
  var element   = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];
  this.applyClasses(element, classes);

  element.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(element, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(element, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(element, classes);
  }

  // Put the title on the board
  this.tileContainer.appendChild(element);
};

 Action.prototype.applyClasses = function (element, classes) {
   element.setAttribute("class", classes.join(" "));
 };

Action.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

Action.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

 