

// Bohan Gou,000360941. certify that this material is my original work.
// No other person's work has been used without due acknowledgement. 
// I have not made my work available to anyone els



function Tile(position, value) {
  this.x = position.x;
  this.y = position.y;
  this.value = value || 2;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together//结合title
}

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.clone = function() {
  newTile = new Tile({ x: this.x, y: this.y }, this.value);
   return newTile;
}
