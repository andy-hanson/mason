import Loc from 'esast/dist/Loc'
import tupl from 'tupl/dist/tupl'
import { G_Paren, G_Bracket, G_Block, G_Quote, G_Line, G_Space } from '../Token'

export default tupl('GroupPre', Object, 'doc', [ 'loc', Loc, 'kind', Number ])

export const groupOpenToClose = k =>
	(k === GP_Line || k === GP_Space) ? k : -k

export const
	GP_OpenParen = G_Paren,
	GP_OpenBracket = G_Bracket,
	GP_OpenBlock = G_Block,
	GP_OpenQuote = G_Quote,
	GP_Line = G_Line,
	GP_Space = G_Space,
	GP_CloseParen = -G_Paren,
	GP_CloseBracket = -G_Bracket,
	GP_CloseBlock = -G_Block,
	GP_CloseQuote = -G_Quote
