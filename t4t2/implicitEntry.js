const capitalize = require("capitalize");

/** @typedef {import("./Entry").Whole_o} Whole_o */
/** @typedef {import("./TableSqlite3Table")._o} TableSqlite3Table_o */

/**
 * Expands one entry into several other entries for convenience
 *
 * @param {Whole_o} entry
 * @returns {TableSqlite3Table_o}
 */
export function toTable_o(entry) {
   /** @type {import("./Entry").Token_o[]} */
   const tokens = [];
   /** @type {import("./Entry").Pos_o[]} */
   const poss = [];

   const { string, pos } = entry;
   const token_type = entry.token_type.toLowerCase();

   const lowercase_string = string.toLowerCase();
   const nohyphen_string = string.replace(/-/g, " ");
   const lowercase_nohyphen_string = lowercase_string.replace(/-/g, " ");

   tokens.push({ string, token_type });
   tokens.push({ string: lowercase_string, token_type });
   tokens.push({ string: nohyphen_string, token_type });
   tokens.push({ string: lowercase_nohyphen_string, token_type });

   poss.push({ string, pos });
   poss.push({ string: lowercase_string, pos });
   poss.push({ string: nohyphen_string, pos });
   poss.push({ string: lowercase_nohyphen_string, pos });

   if (pos === "NNP") {
      const capitalized_string = capitalize.words(lowercase_string);
      tokens.push({ string: capitalized_string, token_type });
      poss.push({ string: capitalized_string, pos });
   }

   return ({ tokens, poss });
}
